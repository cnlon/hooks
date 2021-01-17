import { useEffect, useRef } from 'react';

export interface Options {
  restoreOnUnmount?: boolean;
}

const DEFAULT_OPTIONS: Options = {
  restoreOnUnmount: false,
};

const pending = {
  title: '',
};

function useTitle(title: string, options: Options = DEFAULT_OPTIONS) {
  pending.title = title; // 仅使用最后一次设置的标题
  const titleRef = useRef<string | null>(null);
  useEffect(() => {
    if (title !== pending.title) {
      return;
    }
    document.title = title;
    if (titleRef.current === null) {
      // 仅保存第一次成功设置的标题
      titleRef.current = title;
    }
  }, [title]);

  useEffect(() => {
    if (options && options.restoreOnUnmount) {
      return () => {
        if (titleRef.current !== null) {
          // 恢复第一次成功设置的标题
          document.title = titleRef.current;
        }
      };
    }
  }, []);
}

export default typeof document !== 'undefined' ? useTitle : (_title: string) => {};
