import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

type Props = {
  exportAs: (type: 'gltf' | 'glb' | 'stl') => void
}

export default function ExportDropDown(props: Props) {
  const { exportAs } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Export As
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400 transform rotate-180" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 bottom-full mb-2 z-10 w-56 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              onClick={() => exportAs('gltf')}
            >
              GLTF
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              onClick={() => exportAs('glb')}
            >
              GLB
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              onClick={() => exportAs('stl')}
            >
              STL
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}