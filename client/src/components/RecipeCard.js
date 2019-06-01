import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const dateCreated = date => moment(date).format('LL');

const RecipeCard = ({ recipe, userId, deleteRecipeClick }) => {
  const {
    name,
    image,
    userName,
    userAvatar,
    created,
    category,
    slug,
    user,
    _id
  } = recipe;
  return (
    <div className="column is-one-third">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src={image ? `/images/${image}` : `/images/landing-hero.jpg`}
              alt={name}
            />
          </figure>
        </div>
        <div className="card-content">
          <h2 className="title is-size-1">{name}</h2>
          <div className="media">
            <div className="media-left">
              <figure className="image is-24x24">
                <img className="is-rounded" src={userAvatar} alt={userName} />
              </figure>
            </div>
            <div className="media-content">
              <p className="subtitle is-6">
                Posted by {userName} on {dateCreated(created)}
              </p>
            </div>
          </div>

          <div className="content">
            <div className="tags are-medium">
              {category[0].split(',').map((categoryItem, i) => {
                return (
                  <span
                    key={i}
                    className="tag is-rounded is-white- is-primary is-medium"
                  >
                    {categoryItem}
                  </span>
                );
              })}
            </div>
            <div className="field is-grouped">
              <p className="control">
                <Link className="button is-primary" to={`/recipe/${slug}`}>
                  View Recipe
                </Link>
              </p>
              {userId === user ? (
                <p className="control">
                  <button
                    onClick={() => {
                      deleteRecipeClick(_id);
                    }}
                    className="button is-danger"
                  >
                    Delete Recipe
                  </button>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  userID: PropTypes.string,
  deleteRecipeClick: PropTypes.func
};

export default RecipeCard;
