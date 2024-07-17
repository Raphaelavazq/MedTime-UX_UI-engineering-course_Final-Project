
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ className, href, children, onClick, px }) => {
  const buttonClasses = classNames(
    'px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75',
    className,
    {
      [px]: px,
    }
  );

  return href ? (
    <a href={href} className={buttonClasses} onClick={onClick}>
      {children}
    </a>
  ) : (
    <button type="button" className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  px: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  href: '',
  onClick: () => {},
  px: '',
};

export default Button;