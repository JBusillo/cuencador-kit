import path from 'path';
import feather from 'feather-icons/dist/icons.json';
import fs from 'fs-extra';

const icons = [
    'MenuIcon',
    'GlobeIcon',
    'LogInIcon',
    'LogOutIcon',
    'SettingsIcon',
    'MoonIcon',
    'HelpCircleIcon',
    'MailIcon',
    'InfoIcon'
];

let source = `<script context="module">
    let svgMap = new Map();
`;

for (const x of icons) {
    const f = x
        .replace(/([a-z]+)([A-Z])/g, (p1, p2, p3) => {
            return p2 + '-' + p3;
        })
        .toLowerCase()
        .slice(0, -5);

    source += `    svgMap.set('${x}','${feather[f]}');
`
}

source += `</script>

<script>
	export let name;
	export let size = '35';
	export let strokeWidth = 2;
	export { customClass as class };
	let customClass = '';
</script>

<svg width="{size}" height="{size}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="{strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="{customClass}"> 
    {@html svgMap.get(name)}
</svg>
`

const filepath = `./src/lib/icons/feather3.svelte`;

fs.ensureDir(path.dirname(filepath)).then(() => fs.writeFile(filepath, source, 'utf8'));
