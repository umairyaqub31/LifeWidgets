export default function capitalize(s) {

	if (typeof s !== "string") return "";
    let str = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    return str.replace(/_/g, " ");
}