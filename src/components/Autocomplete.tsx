import { useState, useEffect, KeyboardEvent } from 'react';
import axios from 'axios';
import { IPost } from '../types';

const Autocomplete = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [showPostOptions, setShowPostOptions] = useState<boolean>(false);
  const [postIndex, setPostIndex] = useState<number>(0);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      axios
        .get('https://jsonplaceholder.typicode.com/posts?search=' + value)
        .then(({ data }) => {
          const filteredResults = data.filter(
            (opt: IPost) => opt.title.toLowerCase().indexOf(value.toLowerCase()) >= 0
          );
          setPosts(filteredResults);
          // setShowPostOptions(true);
        })
        .catch((err) => {
          console.log(err);
          setPosts([]);
        });
    }, 500);

    return () => {
      clearTimeout(debounceSearch);
    };
  }, [value]);

  const handleSelectPost = (postVal: string) => {
    setValue(postVal);
    setShowPostOptions(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (postIndex === 0) {
        return;
      }
      setPostIndex(postIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (postIndex - 1 === posts.length) {
        return;
      }
      setPostIndex(postIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue(posts[postIndex].title);
      setPostIndex(0);
      setShowPostOptions(false);
    }
  };

  return (
    <div className='container'>
      <input
        onClick={() => setShowPostOptions(!showPostOptions)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {showPostOptions && (
        <div className='options'>
          {posts.length > 0 ? (
            <ul>
              {posts.map((opt, index) => {
                let string = opt.title.substr(0, opt.title.toLowerCase().indexOf(value.toLowerCase()));
                let endString = opt.title.substr(opt.title.toLowerCase().indexOf(value.toLowerCase()) + value.length);
                let highlightedText = opt.title.substr(
                  opt.title.toLowerCase().indexOf(value.toLowerCase()),
                  value.length
                );
                return (
                  <li
                    key={index}
                    className={index === postIndex ? 'active' : ''}
                    onClick={() => handleSelectPost(opt.title)}
                  >
                    {string}
                    <span className='highlight'>{highlightedText}</span>
                    {endString}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>There are no results</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
