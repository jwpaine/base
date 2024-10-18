import { styledH1, styledDiv, styledP, styledButton, styledHeader } from './styles.css';

const ensureStyleObject = (styling: any): React.CSSProperties => {
    if (typeof styling !== 'object' || styling === null) {
        return {};
    }

    // Check if all keys are in camelCase
    for (const key in styling) {
        if (styling.hasOwnProperty(key)) {
            // If the key contains a hyphen (kebab-case), return {}
            if (key.includes('-')) {
                return {};
            }
        }
    }

    return styling;
};


export const Header = ({ id, styling, children }: { id?: string; styling?: React.CSSProperties; children: React.ReactNode }) => {
    const override = ensureStyleObject(styling); // Ensure styling is an object

    return <div id={id} className={styledHeader} style={override}>{children}</div>;
};


export const H1 = ({ id, styling, children }: { id?: string; styling?: React.CSSProperties; children: React.ReactNode }) => {
    const override = ensureStyleObject(styling); // Ensure styling is an object

    return <div id={id} className={styledH1} style={override}>{children}</div>;
};

// Container component
export const Container = ({ id, styling, children }: { id?: string; styling?: React.CSSProperties; children: React.ReactNode }) => {
    const override = ensureStyleObject(styling); // Ensure styling is an object

    return <div id={id} className={styledDiv} style={override}>{children}</div>;
};

export const Section = ({ id, styling, children }: { id?: string; styling?: React.CSSProperties; children: React.ReactNode }) => {
    const override = ensureStyleObject(styling); // Ensure styling is an object

    return <section id={id} className={styledDiv} style={override}>{children}</section>;
};


// Paragraph component
export const P = ({ id, styling, children }: { id?: string; styling?: React.CSSProperties; children: React.ReactNode }) => {
    const override = ensureStyleObject(styling); // Ensure styling is an object

    return <p id={id} className={styledP} style={override}>{children}</p>;
};


export const Button = ({ id, styling, children, onClick }: { id?: string; styling?: React.CSSProperties; children: React.ReactNode; onClick?: () => void }) => {
    const override = ensureStyleObject(styling); // Ensure styling is an object
    return (
        <button id={id} className={styledButton} style={override} onClick={onClick}>
            {children}
        </button>
    );
};

