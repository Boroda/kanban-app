import React from 'react';

import classnames from 'classnames';


export default ({editing, value, onEdit, className, ...props}) => {
    if (editing) {
        return <Edit
            className={className}
            value={value}
            onEdit={onEdit}
            {...props} />;
    }

    return <span className={classnames('value', className)} {...props}>
        {value}
    </span>;
}

// We could allow edit/value to be swapped here through props
const Editable = ({editing, value, onEdit}) => {
    if (editing) {
        return <Editable.Edit value={value} onEdit={onEdit} />;
    }

    return <Editable.Value value={value} />;
};

class Edit extends React.Component {
    render() {
        const {className, value, onEdit, ...props} = this.props;

        return <input
            type="text"
            className={classnames('edit', className)}
            autoFocus={true}
            defaultValue={value}
            onBlur={this.finishEdit}
            onKeyPress={this.checkEnter}
            {...props} />;
    }

    checkEnter = (e) => {
        if (e.key === 'Enter') {
            this.finishEdit(e);
        }
    };

    finishEdit = (e) => {
        const value = e.target.value;

        if (this.props.onEdit) {
            this.props.onEdit(value);
        }
    };
}
