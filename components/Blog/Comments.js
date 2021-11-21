import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { getComments } from '../../utils/index';

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((result) => {
      setComments(result);
    });
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className="">
          <h3 className="">{comments.length} Comments</h3>
          {comments.map((comment, index) => (
            <div key={index} className="">
              <p className="">
                <span className="">{comment.name}</span> on{' '}
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className="">{parse(comment.comment)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
