/**
 * Non #id specific css used through out the whole email
 * We use .sk- (skipify block) to avoid css naming conflict with client's email
 */

module.exports = () => {
//language=css
  return `
.sk-wrapper {
    margin: auto;
    width: 100%;
    max-width: 600px;
}
.sk-blk a {
    color: black !important;
    text-decoration: none !important;
}
.sk-blk .mt1 {
    margin-top: 16px !important;
}

.sk-blk .mb1 {
    margin-bottom: 16px !important;
}
.sk-swatch {
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    width: 30px;
    height: 30px;
    position: relative;
    display: inline-block;
    margin-right: 10px;
    border: 2px solid #999999;
    margin-bottom: 10px;
}
.sk-txt1 {
    color: #031e2f;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.4;
}
.sk-txt2 {
    color: #656565;
    line-height: 1;
    font-size: 16px;
}
.sk-center {
    text-align: center;
}
.sk-blk img {
    width: 100%;
    padding: 0;
    margin: 0;
}
.sk-blk .sk-hide, .sk-blk input {
    display: none;
}
.sk-blk .sk-btn {
    display: inline-block;
    cursor: pointer;
    padding: 5px;
    border: 1px solid transparent;
    margin: 5px 5px 5px 0;
}

.sk-blk .sk-btn:hover {
    border-bottom: 1px solid #aaa;
    color: black;
}

.sk-blk .buy-btn {
    width: 250px;
    margin: auto;
    
}
.sk-blk .left {
    flex: 1.5;
}
.sk-blk .right {
    flex: 1.3;
}
.opt-btn {
    font-size: 15px;

}
.pd-group-wrapper {
    display: flex;
    flex-direction: column;
}
.pd-group-wrapper.product-compact {
    flex-direction: row;
}
@media screen and (max-width:504px){
    .pd-group-wrapper {
        flex-direction: column;
    }
    .pd-img img {
        height: 219px;
        object-fit: cover;
        object-position: bottom;
    }
}
`;

};