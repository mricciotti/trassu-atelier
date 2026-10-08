export async function compressImage(file: File, maxSize = 900, quality = 0.78) {
  if (!file.type.startsWith('image/')) {
    throw new Error('Envie um arquivo de imagem (JPG, PNG ou WebP).');
  }
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Não foi possível processar a imagem.');
  }
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', quality);
}
