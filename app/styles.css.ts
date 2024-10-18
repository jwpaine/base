// styles.css.ts
import { style } from '@vanilla-extract/css';

// H1 style: Default font size, color, and text alignment
export const h1Style = style({
  fontSize: '50px',
  color: 'red',
  textAlign: 'left',
  margin: '20px 0',
});

// Container style: Default padding and background color
export const containerStyle = style({
  padding: '20px',
  backgroundColor: '#f8f8f8',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
});

// P style: Paragraph font settings
export const pStyle = style({
  fontSize: '1rem',
  lineHeight: '1.6',
  color: '#666',
});

// Button style: Default button appearance
export const buttonStyle = style({
  padding: '10px 20px',
  backgroundColor: 'blue', // This will be overridden by inline styles if provided
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'darkblue',
  },
});
