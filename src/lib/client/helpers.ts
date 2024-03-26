import { twMerge as baseTwMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export const twMerge = (...input: ClassValue[]): string => {
	return baseTwMerge(clsx(input));
};

export const getDaysLeft = (endDate: number): number => {
	const millisecondsPerDay = 24 * 60 * 60 * 1000;
	const currentDate = new Date();
	const endDateObject = new Date(endDate);
	const timeDiff = endDateObject.getTime() - currentDate.getTime();
	const daysRemaining = Math.ceil(timeDiff / millisecondsPerDay);
	return daysRemaining;
};
