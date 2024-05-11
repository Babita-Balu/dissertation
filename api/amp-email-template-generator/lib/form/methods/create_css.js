module.exports = (options) => {
    let { customAmpCss = '', buyButtonTextColor, buyButtonBgColor } = options;

    //language=css
    return `
/*START OF SKIPIFY SHOPPABLE CSS*/
.sk_wrapper {
    max-width: ${options.maxWidth};
    width: 100%;
    margin: auto;
}
.sk-blk {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
}
.sk-blk :focus{
    outline: 0;
}
.sk-blk a {
    text-decoration: none;
    color: ${options.themeColor};
}
.sk-blk a {
    color: ${options.themeColor};
    text-decoration: none;
}

.sk-blk h1 {
    font-size: 1.7rem;
}
.sk-blk h2 {
    font-size: 24px;
}
.sk-blk amp-img.contain img {
    object-fit: contain;
}
.sk-blk amp-img.cover {
    width: 100%;
}
.sk-blk amp-img.cover img {
    object-fit: cover;
}
.flex {
    display: flex;
}
.jc-se {
    justify-content: space-evenly;
}
.sk-opt1 {
  min-height: 60px;
}
.sk-pd-compact .sk-btn {
  font-size: 0.8em;
  border-radius: 0px;
}
.sk-btn {
    background: ${buyButtonBgColor};
    text-transform:uppercase;
    cursor:pointer;
    text-align:center;
    margin:auto;
    max-width:50%;
    color: ${buyButtonTextColor};
    display:flex;
    border:1px solid rgba(0,0,0,0);
    font-size:1rem;
    justify-content:center;
    align-items:center;
    padding:10px;
    font-weight:700;
    letter-spacing:.1rem;
    min-height:25px;
}
.sk-btns .sk-btn{
    background: ${buyButtonBgColor};
    display: flex;
    justify-content: center;
    align-items: center;
}
.sk-btns .sk-logo{
    background-image: url(https://storage.googleapis.com/skipify-assets/images/check_logo.png);
    background-repeat: no-repeat;
    background-size: cover;
    height: 24px;
    width: 24px;
    margin-right: 16px;
}
.sk-cart-icon{
    background-image: url(https://storage.googleapis.com/skipify-assets/images/cart.png);
    background-repeat: no-repeat;
    background-size: cover;
    height: 24px;
    width: 24px;
    margin-right: 16px;
}
.sk-btn.light {
    background: #EAEAEA;
    border: 1px solid #656565;
    color: #656565;
}
.sk-btn.rm {
    background: #eee;
    border: 1px solid #656565;
    color: #656565;
}
.sk-btn.disabled{
    background: #656565;
}
.mb1 {
    margin-bottom: 16px;
}
.mt1 {
    margin-top: 16px;
}
.mb3 {
    margin-bottom: 3rem;
}
.mt3 {
    margin-top: 3rem;
}
.sk-pd {
    padding: 8px;
    margin-bottom: 24px;
    text-align: center;
}
.sk-pd select {
    width: 50%;
}
.sk-thumb {
    position: relative;
    width: 5rem;
    height: 5rem;
    flex-shrink: 0;
}
.sk-pd-img {
    position: relative;
    width: auto;
    height: 600px;
    flex-shrink: 0;
}
.sk-item {
    justify-content: space-between;
}
.sk-pd-info {
    flex: 1;
    padding-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.sk-pd-info > div {
  margin-bottom: 5px;
}
.sk-checkout {
    padding-top: 16px;
    padding-bottom: 16px;
}
.sk-checkout .sk-btn {
    margin: auto;
    width: 80%;
    max-width: 80%;
}
.sk-remove {
    width: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.sk-remove:hover{
    background: #eee;
}
.sk-total {
    margin-top: 32px;
    margin-bottom: 32px;
    margin-right: 32px;
    text-align: right;
}
.sk-no-cart-checkout {
    min-height: 90px;
}
.sk-blk .cart {
    padding: 32px;
}
.sk-blk .hide {
    display: none;
}

.sk-blk .show {
    display: block;
}
.sk-show-flex {
    display: flex;
}
.sk-show-inline {
  display: inline;
}
.sk-txt1 {
color:${options.themeColor};
    font-weight: 700;
    font-size: 21px;
    line-height: 1;
}
.sk-txt2 {
    color: #656565;
    line-height: 1;
    font-size: 16px;
}
.sk-qty {
    font-size: 24px;
    display: flex;
    width: 40%;
    justify-content: center;
    margin: 0 auto;
    align-items: center;
    min-height: 50px;
}
.sk-qty select {
  height: 25px;
}
.sk-qty-label {
    font-size: 16px;
    margin-right: 16px;
}
.sk-qty .sk-qty_btn {
    cursor: pointer;
}
.sk-qty .sk-qty_num {
    padding: 0 16px;
}
.sk-strike {
text-decoration: line-through;
}
.sk-bold {
  font-weight: bold;
}
.sk-swatch {
border-radius: 50%;
cursor: pointer;
overflow: hidden;
width: 30px;height: 30px;position: relative;display: inline-block;margin-right: 10px;
border:2px solid #999999;
}
.sk-active {
border-color: ${options.themeColor};
}

.color-select {padding-bottom:20px; text-align:left; width: auto; margin: auto }
.color-select .sk-swatch {
    margin-bottom: 10px;
}
.sk-pd-compact.sk-pd-wrapper{
    padding-top: 100px;
}
.sk-pd-compact .sk-pd {
  display: flex;
}
.sk-pd-compact .sk-pd-img {
  width: 45%;
  height: 450px;
}
.sk-pd-compact .sk-pd-img-wrapper{
    width: 65%;
    margin-right: 20px;
    margin-bottom: 20px;
}
.sk-pd-compact .sk-pd-detail {
  width: 100%;
  padding-top: 20px;
}
.sk-cart-wrapper {
    margin-bottom: 40px;
}
.sk-hide-desktop {
    display: none;
}
.sk-hide-mobile {
    display: block;
}
.sk-hide-height {
  height: 0;
  overflow: hidden;
}
.sk-show-height {
  height: auto;
  overflow: auto;
}
.sk-opt-btn {
  display: inline-block;
  margin-right: 5px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid transparent;
  margin-bottom: 15px;
}
.sk-opt-btn:hover,.sk-opt-btn.sk-active {
  border-bottom: 1px solid #aaa;
}
@media screen and (max-width: ${options.mobileBreakpoint}) {
    .sk-checkout .sk-btn {
        width: 90%;
        margin: auto;
    }
    .sk-btn {
        max-width: 90%;
        width: 70%;
        font-size: 13px;
    }
    .sk-hide-desktop {
        display: block;
    }
    .sk-hide-mobile {
        display: none;
    }
    .sk-pd-compact .sk-pd {
        flex-direction: column;
    }
    .sk-pd-compact .sk-pd-img-wrapper{
        width: 100%;
        margin: 0 auto 20px auto;
        max-width: 300px;
    }
    .sk-pd-compact .sk-pd-img {
        height: 300px;
        margin: auto;
        width: 300px;
    }
    .sk-pd-compact.sk-pd-wrapper{
        padding-top: 0;
    }
}

${customAmpCss}

/*END OF SKIPIFY SHOPPABLE CSS*/
  `;
};