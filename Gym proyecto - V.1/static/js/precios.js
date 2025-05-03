function calculatePrice() {
    // Obtener valores de los inputs
    const plan = document.getElementById('plan').value;
    const months = document.getElementById('months').value;
    let price = 0;
    let discount = 0;
    let discountMessage = "";

    // Definir los precios por plan
    switch (plan) {
        case 'hierro':
            price = 60000;
            if (months >= 6) {
                discount = 0.20;
                discountMessage = "¡Obtienes un 20% de descuento por suscripción de 3 meses o más!";
            }
            break;
        case 'acero':
            price = 80000;
            if (months >= 6) {
                discount = 0.20;
                discountMessage = "¡Obtienes un 20% de descuento por suscripción de 3 meses o más!";
            }
            break;
        case 'platino':
            price = 100000;
            if (months >= 3) {
                discount = 0.15;
                discountMessage = "¡Obtienes un 15% de descuento por suscripción de 3 meses o más!";
            }
            break;
        case 'titanio':
            price = 120000;
            if (months >= 3) {
                discount = 0.15;
                discountMessage = "¡Obtienes un 15% de descuento por suscripción de 3 meses o más!";
            }
            break;
    }

    // Calcular precio final
    const finalPrice = price * months * (1 - discount);
    const discountT=(price*months)-finalPrice

    // Mostrar mensaje de descuento y el precio final
    document.getElementById('discount-message').innerText = discountMessage;
    document.getElementById('final-price').innerText = `Precio Final: $${finalPrice.toFixed(2)}`
    document.getElementById('discount-total').innerText=`Descuento: $${discountT.toFixed(2)}`;
}