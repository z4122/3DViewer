export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link); // Firefox workaround, see #6594

function save(blob: Blob | MediaSource, filename: string) {
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function saveString(text: BlobPart, filename: string) {
  save(new Blob([text], { type: 'text/plain' }), filename);
}


function saveArrayBuffer(buffer: string | ArrayBufferView | ArrayBuffer | Blob, filename: string) {
  save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
}

export function saveToLocal(content: string | ArrayBuffer) {
  if (content instanceof ArrayBuffer) {
    saveArrayBuffer(content, 'scene.glb');
  } else {
    const output = JSON.stringify(content, null, 2);
    saveString(output, 'scene.gltf');
  }
}