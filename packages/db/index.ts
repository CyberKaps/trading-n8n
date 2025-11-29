

import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});


const EdgesSchema = new Schema({
    id: { 
        type: String, 
        required: true 
    },
    source: { 
        type: String, 
        required: true 
    },
    target: { 
        type: String, 
        required: true 
    },
}, {
    _id: false
});

const PositionSchema = new Schema({
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    }
}, {
    _id: false
});


const NodeDataSchema = new Schema({
    kind: {
        type: String,
        enum: ['ACTION', 'TRIGGER'],
    },
    metadata: Schema.Types.Mixed
}, {
    _id: false
});

const WorkflowNodeSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    position: PositionSchema,
    credentials: Schema.Types.Mixed,
    nodeId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Nodes',
        required: true
    },
    data: NodeDataSchema,
}, {
    _id: false
});

const WorkflowSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true 
    },
    nodes: [WorkflowNodeSchema],
    edges: [EdgesSchema],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
})


const CredentialsTypeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    required: {type: Boolean, required: true}
}, {
    _id: false
});

const NodesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['ACTION', 'TRIGGER'],
        required: true
    },
    credentialsType: [CredentialsTypeSchema]
})  


const ExecutionSchema = new Schema({
    workflowId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Workflows', 
        required: true 
    },
    status: {
        type: String,
        enum: ['PENDING', 'SUCCESS', 'FAILURE'],
        default: 'PENDING'
    },
    startTime: { 
        type: Date, 
        default: Date.now,
        required: true
    },
    endTime: { 
        type: Date 
    }
});
    

export const UserModel = mongoose.model('Users', UserSchema);
export const WorkflowModel = mongoose.model('Workflows', WorkflowSchema);
export const NodesModel = mongoose.model('Nodes', NodesSchema);
export const ExecutionModel = mongoose.model('Executions', ExecutionSchema);