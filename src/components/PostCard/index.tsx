import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import formatDate from '../../utils/formatDate';
import './styles.scss';

interface PostCardProps {
  title: string;
  author: string;
  category: string;
  createdAt: Date;
}

export function PostCard({ title, author, category, createdAt }: PostCardProps): React.ReactElement {
  return (
    <div className="card">
      <div className="card__header">
        <span className="card__header__author">
          <FaUserCircle size={28} color="#9ea8b5" />
          <span className="card__header__author__name">{author}</span>
        </span>
        <span className="card__header__date">{formatDate(createdAt.toString())}</span>
      </div>
      <span className="card__title cursor-pointer">{title}</span>
      <span className="card__category">{category}</span>
    </div>
  );
}
