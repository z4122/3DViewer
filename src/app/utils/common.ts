import { useEffect, useState } from 'react';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function save(blob: Blob | MediaSource, filename: string) {
  const link = document.createElement('a');
  link.style.display = 'none';
  document.body.appendChild(link); // Firefox workaround, see #6594

  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

export function saveString(text: any, filename: string) {
  save(new Blob([text], { type: 'text/plain' }), filename);
}


export function saveArrayBuffer(buffer: string | ArrayBufferView | ArrayBuffer | Blob, filename: string) {
  save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
}

export function saveToLocal(content: { [key: string]: any; } | ArrayBuffer, type: 'gltf' | 'glb' | 'stl') {
  if (content instanceof ArrayBuffer) {
    saveArrayBuffer(content, 'scene.' + type);
  } else {
    const output = JSON.stringify(content, null, 2);
    saveString(output, 'scene.' + type);
  }
}

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|touchscreen|mobi|tablet|Windows Phone/i;
    setIsMobile(mobileRegex.test(navigator.userAgent));
  }, []);

  return isMobile;
};