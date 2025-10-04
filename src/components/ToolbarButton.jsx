import { Button } from 'react-bootstrap';

const ToolbarButton = ({ variant, icon: Icon, tooltip, onClick, children, disabled }) => {
    return (
        <Button
            variant={variant}
            onClick={onClick}
            disabled={disabled}
            title={tooltip}
            className="me-2 d-flex align-items-center"
        >
            {Icon && <Icon className="me-1" />}
            {children}
        </Button>
    );
};

export default ToolbarButton;
