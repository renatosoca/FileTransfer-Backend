import { Response } from 'express';
/* import fs from 'fs'; */
import { AuthRequest } from '../interfaces';
import { storageModel } from '../models';
import { generateURL } from '../utils';
import { hashPassword } from '../utils';

export const uploadFile = async ({ user, file, body }: AuthRequest, res: Response) => {
  if (!file) return res.status(400).json({ ok: false, msg: 'No se ha seleccionado ningún archivo' });
  const { password, download } = body;
  const PUBLIC_URL = process.env.PUBLIC_URL || '';

  try {
    const storage = new storageModel(file);
    storage.originalName = file.originalname;
    storage.url = `${PUBLIC_URL}/${file.filename}`;
    storage.name = generateURL( file.originalname.split(/[^a-zA-Z0-9]+/)[0] );

    if (user) {
      storage.user = user;

      if (download) storage.download = download;
      if (password) storage.password = hashPassword(password);
    }

    //await file.save();

    return res.status(201).json({ file, user, storage })
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error del sistema, contacte al administrador'});
  }
}

/* export const uploadFileNow = async ({ file, user }: AuthRequest, res: Response) => {
  if (!file) return res.status(400).json({ ok: false, msg: 'No se ha seleccionado ningún archivo' });

  try {
    if ( !user && file.size > 1024 * 1024 ) return res.status(400).json({ ok: false, msg: 'El archivo no puede ser mayor a 1MB' });
    if ( user && file.size > 1024 * 1024 * 10 ) return res.status(400).json({ ok: false, msg: 'El archivo no puede ser mayor a 10MB' });

    return res.json({msg: 'Subido', tamaño: file?.size})
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error del sistema, contacte al administrador'});
  }
}

export const getFile = async ({ params }: AuthRequest, res: Response, next: NextFunction) => {
  const { fileUrl } = params;

  try {
    const file = await fileModel.findOne({ url: fileUrl });
    if (!file) return res.status(404).json({ ok: false, msg: 'Archivo no encontrado' });

    res.status(200).json({ ok: true, file });

    if (file.download === 1) {
      await fileModel.findByIdAndDelete(file._id);
      return next();
    }

    file.download--;
    return await file.save();
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error del sistema, contacte al administrador'});
  }
}

export const deleteFile = async ({ params }: AuthRequest, _: Response) => {
  try {
    fs.unlinkSync(`${process.cwd()}/storage/${params.fileUrl}`);
  } catch (error) {
    
  }
} */