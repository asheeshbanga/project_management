import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';

const EditProjectForm = ({ project }) => {
    const projectStatusString = project.status;
    let projectStatus = '';

    if (projectStatusString === 'Not Started') {
        projectStatus = 'new';
    } else if (projectStatusString === 'In Progress') {
        projectStatus = 'progress';
    } else if (projectStatusString === 'Completed') {
        projectStatus = 'completed';
    }

    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState(projectStatus);

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (!name || !description || !status) {
            return alert('Please fill out all fields');
        }

        updateProject({ variables: { id: project.id, name, description, status } });
    }

    return (
        <div className='mt-5'>
            <h3>Update Project Details</h3>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className='form-label'>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className='form-label'>Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className='form-label'>Status</label>
                    <select
                        className="form-select"
                        value={status}
                        id="status"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default EditProjectForm