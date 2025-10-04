import { useState, useEffect, useCallback } from 'react';
import { Table, Form } from 'react-bootstrap';
import Toolbar from './Toolbar';
import api from '../utils/api';

const getCheckboxId = (prefix, id) => `${prefix}-${id}`;

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get('/users');
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSelectAll = () => {
        const allIds = selectAll ? [] : users.map(u => u.id);
        setSelectedIds(allIds);
        setSelectAll(!selectAll);
    };

    const handleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    // Note: handleAction handles block, unblock, and delete operations in a single function
    const handleAction = async (action, ids) => {
        if (!ids || ids.length === 0) return;
        try {
            if (action === 'delete') {
                await api.delete('/users', { data: { userIds: ids } });
            } else {
                await api.post(`/users/${action}`, { userIds: ids });
            }
            fetchUsers();
            setSelectedIds([]);
        } catch (err) {
            console.error(`Failed to ${action} users:`, err);
        }
    };

    const handleDeleteUnverified = () => {
        const unverifiedIds = users.filter(u => u.status === 'unverified').map(u => u.id);
        handleAction('delete', unverifiedIds);
    };

    const selectAllId = getCheckboxId('user-checkbox', 'all');

    return (
        <div>
            <Toolbar
                selectedIds={selectedIds}
                onBlock={(ids) => handleAction('block', ids)}
                onUnblock={(ids) => handleAction('unblock', ids)}
                onDelete={(ids) => handleAction('delete', ids)}
                onDeleteUnverified={handleDeleteUnverified}
            />

            {loading ? (
                <div>Loading users...</div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>
                                <Form.Check
                                    type="checkbox"
                                    id={selectAllId}
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Last Login</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            const checkboxId = getCheckboxId('user-checkbox', user.id);
                            return (
                                <tr key={user.id}>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            id={checkboxId}
                                            checked={selectedIds.includes(user.id)}
                                            onChange={() => handleSelect(user.id)}
                                        />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.last_login ? new Date(user.last_login).toLocaleString() : '-'}</td>
                                    <td>{user.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default UsersTable;
