// styles.css.ts
import { style } from '@vanilla-extract/css';



// Button component
export const styledButton = style({
  padding: '10px 20px',
  backgroundColor: 'blue', 
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'darkblue',
  },
});

export const styledP = style({
  fontSize: '1rem',
  color: '#333',
});

export const styledDiv = style({

});

export const styledHeader = style({

});

export const styledH1 = style({
  fontSize: '2em',
  color: '#333',
});