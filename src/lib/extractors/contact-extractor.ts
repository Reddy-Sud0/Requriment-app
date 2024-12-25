interface ContactInfo {
  email: string;
  phone: string;
  name: string;
}

export function extractContactInfo(text: string): ContactInfo {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const phoneRegex = /(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
  const nameRegex = /^([A-Z][a-z]+ )+[A-Z][a-z]+/m;

  return {
    email: text.match(emailRegex)?.[0] || '',
    phone: text.match(phoneRegex)?.[0] || '',
    name: text.match(nameRegex)?.[0] || '',
  };
}