
import './Publicrecipe.css';


function Publicrecipe({ recipe, ipServer }) {

  if (!recipe) {
    return <div className="publicrecipe-container">No recipe selected.</div>;
  }

return (

    <div className="publicrecipe-container">
      
      <h1 className="publicrecipe-title">{recipe.RecipeName}</h1>
      <div className="publicrecipe-image-wrapper">
        <img
          className="publicrecipe-image"
          src={`${ipServer}/api/image/${recipe.ImageId}`}
          alt={recipe.RecipeName}
        />
      </div>
      <div className="publicrecipe-section">
        <h2>מצרכים</h2>
        <pre className="publicrecipe-supplies">{recipe.FoodSupplies}</pre>
      </div>
      <div className="publicrecipe-section">
        <h2>אופן הכנה</h2>
        <pre className="publicrecipe-order">{recipe.OrderRecipe}</pre>
      </div>
   
    
    </div>

); }

export default Publicrecipe;
