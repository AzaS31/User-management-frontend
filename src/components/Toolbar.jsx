import ToolbarButton from './ToolbarButton';
import { SlashCircle, Unlock, Trash, PersonX } from 'react-bootstrap-icons';

const Toolbar = ({ selectedIds, onBlock, onUnblock, onDelete, onDeleteUnverified }) => {
    const disabled = selectedIds.length === 0;

    return (
        <div className="mb-3 d-flex">
            <ToolbarButton
                variant="danger"
                icon={SlashCircle}
                tooltip="Block selected users"
                onClick={() => onBlock(selectedIds)}
                disabled={disabled}
            >
            </ToolbarButton>

            <ToolbarButton
                variant="success"
                icon={Unlock}
                tooltip="Unblock selected users"
                onClick={() => onUnblock(selectedIds)}
                disabled={disabled}
            >
            </ToolbarButton>

            <ToolbarButton
                variant="secondary"
                icon={Trash}
                tooltip="Delete selected users"
                onClick={() => onDelete(selectedIds)}
                disabled={disabled}
            >
            </ToolbarButton>

            <ToolbarButton
                variant="warning"
                icon={PersonX}
                tooltip="Delete all unverified users"
                onClick={onDeleteUnverified}
            >
            </ToolbarButton>
        </div>
    );
};

export default Toolbar;
