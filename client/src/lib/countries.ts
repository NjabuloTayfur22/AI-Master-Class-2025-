export interface Country {
  code: string
  label: string
  dial_code: string
}

export const countries: Country[] = [
  { code: 'US', label: 'United States', dial_code: '+1' },
  { code: 'CA', label: 'Canada', dial_code: '+1' },
  { code: 'GB', label: 'United Kingdom', dial_code: '+44' },
  { code: 'ZA', label: 'South Africa', dial_code: '+27' },
  { code: 'IN', label: 'India', dial_code: '+91' },
  { code: 'AU', label: 'Australia', dial_code: '+61' },
  { code: 'DE', label: 'Germany', dial_code: '+49' },
  { code: 'FR', label: 'France', dial_code: '+33' },
  { code: 'BR', label: 'Brazil', dial_code: '+55' },
  { code: 'NG', label: 'Nigeria', dial_code: '+234' }
]
