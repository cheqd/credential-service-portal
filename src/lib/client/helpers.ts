import { twMerge as baseTwMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export const twMerge = (...input: ClassValue[]): string => {
	return baseTwMerge(clsx(input));
};

export const getDaysLeft = (endDate: number): number => {
	const currentTimestamp = Math.floor(Date.now() / 1000);
	const secondsLeft = endDate - currentTimestamp;
	const daysLeft = secondsLeft / (60 * 60 * 24);
	return Math.floor(daysLeft);
};
