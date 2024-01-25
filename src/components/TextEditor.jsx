import React, { useState } from 'react';
import RichTextEditor from 'react-rte';
import './TextEditor.css'
import { useEffect } from 'react';

export const TextEditor = ({story,setStory,setNewStory,type}) => {
  const [value, setValue] = useState( RichTextEditor.createValueFromString(story, 'html') );

  useEffect(() => {
     if (story && type=='edit') {
      setValue(RichTextEditor.createValueFromString(story, 'html'));
    }
  }, [story]);

  
  const onChange = (value) => {
    setValue(value);
    type=='edit' && setNewStory(value.toString('html'))
    type=='create' && setStory(value.toString('html'))
  };
//console.log(value.toString('html'));
//console.log(story,value);

  return <RichTextEditor value={value} onChange={onChange}   />;
};

