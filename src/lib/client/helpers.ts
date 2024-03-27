import { twMerge as baseTwMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export const twMerge = (...input: ClassValue[]): string => {
	return baseTwMerge(clsx(input));
};

export const getRemainingTrialDays = (endDate: number): number | null => {
	const currentTimestamp = Math.floor(Date.now() / 1000);
	const secondsLeft = endDate - currentTimestamp;
	const daysLeft = secondsLeft / (60 * 60 * 24);
	if (daysLeft < 0) {
		return null;
	}
	return Math.floor(daysLeft);
};
