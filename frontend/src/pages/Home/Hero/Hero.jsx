import styles from './Hero.module.css'

function HeroItem(){

    return(
        <section className={styles.hero}>
            <div>A Taste of Tokyo,<br/>Straight to Your Soul</div>
            <div>Tokyo Bites is more than just a restaurant—it's a gateway to the vibrant flavors of Tokyo's street food scene, where traditional culinary artistry meets modern flair. Inspired by the bustling eateries of Japan's capital, we bring you authentic flavors, from fresh sushi and rich ramen to mouthwatering street food like takoyaki, yakitori, and crispy tempura.</div> 
        </section>
    );
}

export default HeroItem;