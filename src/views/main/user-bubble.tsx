import React from 'react';

interface IUserBubble {
  keyIndex: string;
  content: string;
}

function UserBubble(props: IUserBubble) {
  const { keyIndex, content } = props;
  return (
    <div
      className="flex items-start justify-end gap-5 my-3 relative"
      key={keyIndex}
      style={{ fontFamily: '翩翩体-简' }}
    >
      <div
        className="text-white rounded-xl p-4"
        style={{
          background:
            'linear-gradient(to right, rgba(34, 148, 160, 1), rgba(152, 195, 121, 1))',
        }}
      >
        {content}
      </div>
      <img src="/user.svg" className="w-8 mt-2" />
    </div>
  );
}

export default UserBubble;
