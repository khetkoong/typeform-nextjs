'use client'

import { Fragment, useState } from 'react';
import styles from './page.module.css'
import { TextField, MenuItem, Box, Button, Rating, Typography } from '@mui/material';
export default function Login() {
  const [formId, setFormId] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Form | undefined>()

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch(`/api/${formId}`, {
        method: 'get'
      })
      const resJson = await res.json()
      setFormData(resJson)
      setFormId('')
    } catch (error) {
      console.log('----------------->> 🦦🧸 - error:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderFormElement = (element: Field) => {
    switch (element.type) {
      case 'short_text':
        return (
          <div key={element.id}>
            <TextField fullWidth label={element.title} name={element.ref} variant="outlined" />
          </div>
        );
      case 'multiple_choice':
        return (
          <div key={element.id}>
            <TextField fullWidth select label={element.title} name={element.ref} variant="outlined">
              {element.properties.choices.map((choice) => (
                <MenuItem key={choice.id} value={choice.label}>
                  {choice.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        );
      case 'long_text':
        return (
          <div key={element.id}>
            <TextField
              fullWidth
              label={element.title}
              name={element.ref}
              variant="outlined"
              multiline
              rows={4}
            />
          </div>
        );
      case 'phone_number':
        return (
          <div key={element.id}>
            <TextField fullWidth label={element.title} name={element.ref} variant="outlined" type="tel" />
          </div>
        );
      case 'number':
        return (
          <div key={element.id}>
            <TextField fullWidth label={element.title} name={element.ref} variant="outlined" type="number" />
          </div>
        );
      case 'dropdown':
        return (
          <div key={element.id}>
            <TextField fullWidth select label={element.title} name={element.ref} variant="outlined">
              {element.properties.choices.map((choice) => (
                <MenuItem key={choice.id} value={choice.label}>
                  {choice.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        );
      case 'rating':
        return (
          <div key={element.id}>
            <Rating name={element.ref} max={element.properties.steps} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className={styles.main}>
      <Typography variant="h3">
        Typeform schema eaxmple
      </Typography>
      <Typography variant="caption">
        Now support only support type
        short_text,
        multiple_choice,
        long_text,
        phone_number,
        number,
        rating
      </Typography>
      <Box mt={3}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h6">
              example id: RDw7hfH7
            </Typography>
            <TextField placeholder="RDw7hfH7" disabled={loading} type="text" required value={formId} onChange={(e) => setFormId(e.target.value)} />
            <Button type="submit" disabled={loading} variant="contained">get form</Button>
          </Box>
        </form>
      </Box>
      {loading && 'loading...'}
      {formData && formData.id && (
        <Box width="50%">
          title: {formData?.title}
          {formData.fields.map((element) => (
            <Box key={element.id} mt={1}>
              {renderFormElement(element)}
            </Box>
          ))}
          {/* <Button mt={1} variant="contained" color="primary" type="submit">
            Submit
          </Button> */}
        </Box>
      )}
    </main>
  )
}

export interface Form {
  id: string;
  type: string;
  title: string;
  workspace: Theme;
  theme: Theme;
  settings: Settings;
  thankyou_screens: ThankyouScreen[];
  fields: Field[];
  _links: Links;
}

export interface Links {
  display: string;
}

export interface Field {
  id: string;
  title: string;
  ref: string;
  properties: FieldProperties;
  validations: Validations;
  type: string;
}

export interface FieldProperties {
  randomize?: boolean;
  allow_multiple_selection?: boolean;
  allow_other_choice?: boolean;
  vertical_alignment?: boolean;
  choices?: Choice[];
  default_country_code?: string;
  alphabetical_order?: boolean;
  shape?: string;
  steps?: number;
}

export interface Choice {
  id: string;
  ref: string;
  label: string;
}

export interface Validations {
  required: boolean;
}

export interface Settings {
  language: string;
  progress_bar: string;
  meta: Meta;
  hide_navigation: boolean;
  is_public: boolean;
  is_trial: boolean;
  show_progress_bar: boolean;
  show_typeform_branding: boolean;
  are_uploads_public: boolean;
  show_time_to_complete: boolean;
  show_number_of_submissions: boolean;
  show_cookie_consent: boolean;
  show_question_number: boolean;
  show_key_hint_on_choices: boolean;
  autosave_progress: boolean;
  free_form_navigation: boolean;
  pro_subdomain_enabled: boolean;
  capabilities: Capabilities;
}

export interface Capabilities {
  e2e_encryption: E2EEncryption;
}

export interface E2EEncryption {
  enabled: boolean;
  modifiable: boolean;
}

export interface Meta {
  allow_indexing: boolean;
}

export interface ThankyouScreen {
  id: string;
  ref: string;
  title: string;
  type: string;
  properties: ThankyouScreenProperties;
  attachment?: Attachment;
}

export interface Attachment {
  type: string;
  href: string;
}

export interface ThankyouScreenProperties {
  show_button: boolean;
  share_icons: boolean;
  button_mode: string;
  button_text: string;
}

export interface Theme {
  href: string;
}
