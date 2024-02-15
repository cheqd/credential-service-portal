import { twMerge as baseTwMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export const twMerge = (...input: ClassValue[]): string => {
	return baseTwMerge(clsx(input));
};
