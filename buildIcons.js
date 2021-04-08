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

let source = `<script>
  export let name;
  export let size = "35";
  export let strokeWidth = 2;
  let customClass = "";
  export { customClass as class };

  let html;

  switch (name) {
`;
for (const x of icons) {
	const f = x
		.replace(/([a-z]+)([A-Z])/g, (p1, p2, p3) => {
			return p2 + '-' + p3;
		})
		.toLowerCase()
		.slice(0, -5);

	source += `    case "${x}":
      html = \`<svg width=\${size} height=\${size} fill="none" viewBox="0 0 24 24"  stroke="currentColor" stroke-width="\${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="{\${customClass}}">${feather[f]}</svg>\`
      break;
`;
}

source += `    default:
  console.log("undefined icon");
}
</script>

{@html html}
`;

//console.log(source)

const filepath = `./src/lib/icons/feather.svelte`;

fs.ensureDir(path.dirname(filepath)).then(() => fs.writeFile(filepath, source, 'utf8'));
