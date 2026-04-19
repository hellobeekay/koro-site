import coffee01 from '@/assets/images/home/coffee-01.jpg';
import coffee02 from '@/assets/images/home/coffee-02.jpg';
import coffee03 from '@/assets/images/home/coffee-03.jpg';
import coffee04 from '@/assets/images/home/coffee-04.jpg';
import coffee05 from '@/assets/images/home/coffee-05.jpg';
import coffee06 from '@/assets/images/home/coffee-06.jpg';

/** High-res Unsplash photos (downloaded locally for canvas + bundler). */
export const COFFEE_PRODUCT_IMAGES = [
  coffee01,
  coffee02,
  coffee03,
  coffee04,
  coffee05,
  coffee06,
] as const;

export const COFFEE_IMAGE_COUNT = COFFEE_PRODUCT_IMAGES.length;
