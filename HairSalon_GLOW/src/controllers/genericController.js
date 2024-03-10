const getAllData = async (req, res, getDataFunction) => {
    try {
        const data = await getDataFunction();
        res.json(data);
    } catch (error) {
        console.error('Error getting data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default {
    getAllData
};

