export type NodeId = string;

export type CanvasNode = {
    id: NodeId;
    title: string;
    image: string;
    category: string;
};

export type BackgroundNode = {
    id: NodeId;
    image: string;
};

export type CanvasContent = {
    nodes: CanvasNode[];
    background: BackgroundNode;
};

export type CanvasLabelConfiguration = {
    addLabelKey: string;
    backgroundLabelKey: string;
    selectLabelKey: string;
    lockLabelKey: string;
};
