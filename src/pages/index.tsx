import Helmet from '@/components/Helmet';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useAppDispatch, useAppSelector } from '@/utilities/hooks';
import { catsAdd, selectors } from '@/slices/catsSlice';
import { Cat as CatType } from '@/types/Cat';
import Cat from '@/components/Cat';

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=15&api_key=live_z6LQVig8xCivv1VNjWjF5bRZMR40TzP8wDV8J1fNo9ssBwpnRjcERSNXbmtM17ZF');
  const cats: CatType[] = response.data;

  return { props: { cats } };
};

const Cats = ({ cats }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const dispatch = useAppDispatch();

  const allCats = new Set([...cats, ...useAppSelector(selectors.selectAll)]);
  const [isLoading, setIsLoading] = useState(false);

  const checkPosition = async () => {
    if (typeof window !== 'undefined') {
      const height = document.body.offsetHeight;
      const screenHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const threshold = height - screenHeight / 2;
      const position = scrolled + screenHeight;

      if (position >= threshold) {
        window.removeEventListener('scroll', checkPosition);
        setIsLoading(true);
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=15&api_key=${process.env.NEXT_PUBLIC_API_TOKEN}`);
        const newCats: CatType[] = response.data;
        dispatch(catsAdd(newCats));
        setIsLoading(false);
        window.addEventListener('scroll', checkPosition);
      }
    }
  };

  useEffect(() => {
    dispatch(catsAdd(cats));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', checkPosition);
    return () => {
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
    };
  }, []);

  return (
    <>
      <Helmet title="Все котики" description="Выбери любимого котика прямо сейчас!" />
      <div className="cats">
        {[...allCats].map((cat: CatType) => <Cat key={cat.id} cat={cat} />)}
      </div>
      {isLoading && <p className="loading">... загружаем еще котиков ...</p>}
    </>
  );
};

export default Cats;
