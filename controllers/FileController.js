import path from 'path'
import settings from '../settings.js';

export const downloadFile=async(req,res)=>{
    
    try {
        res.download(path.join(settings.PROJECT_DIR, 'files', 'Vista-Corner.pdf'), (err) => {
            if (err) {
                res.status(500).send('Error downloading file.',err);
            }
        });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
