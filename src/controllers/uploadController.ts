import { NextFunction, Response } from 'express';
import fs from 'fs';
import { AuthRequest } from '../interfaces';
import { fileModel } from '../models';
import { generateURL, hashPassword } from '../utils';

export const uploadFile = async ({ body, user }: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const { originalName, download, password } = body;
  const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:4003';

  try {
    const file = new fileModel(body);
    file.url = `${PUBLIC_URL}/${generateURL(originalName.split('.')[0])}`;
    file.name = generateURL(originalName.split('.')[0]);

    if (user) {
      file.user = user;

      if (download) file.download = download;
      if (password) file.password = hashPassword(password);
    }

    //await file.save();

    res.status(201).json({ file, user })
    next()
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'Error del sistema, contacte al administrador'});
  }
}

export const uploadFileNow = async ({ file, user }: AuthRequest, res: Response) => {
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
}