import {CreateDurationType} from "dayjs/plugin/duration";

export function formatDuration(duration: ReturnType<CreateDurationType>, prefix = false) {
	let parts = Array<string>();

	const years = Math.floor(Math.abs(duration.years()));
	const months = Math.floor(Math.abs(duration.months()));
	const days = Math.floor(Math.abs(duration.days()));
	const hours = Math.floor(Math.abs(duration.hours()));
	const minutes = Math.floor(Math.abs(duration.minutes()));
	const seconds = Math.floor(Math.abs(duration.seconds()));

	if (years >= 1) {
		parts.push(`${years} ${years > 1 ? "years" : "year"}`);
	}

	if (months >= 1) {
		parts.push(`${months} ${months > 1 ? "months" : "month"}`);
	}

	if (days >= 1) {
		parts.push(`${days} ${days > 1 ? "days" : "day"}`);
	}

	if (hours >= 1) {
		parts.push(`${hours} ${hours > 1 ? "h" : "h"}`);
	}

	if (minutes >= 1) {
		parts.push(`${minutes} ${minutes > 1 ? "mn" : "mn"}`);
	}

	if (seconds >= 1) {
		parts.push(`${seconds} ${seconds > 1 ? "s" : "s"}`);
	}

	if (parts.length === 0) return "N/A"

	return `${prefix ? "in " : ""}${parts.join(", ")}`;
}
