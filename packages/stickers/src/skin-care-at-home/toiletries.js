/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * External dependencies
 */
import { _x } from '@web-stories-wp/i18n';
import PropTypes from 'prop-types';

const title = _x('Toiletries', 'sticker name', 'web-stories');

function Toiletries({ style }) {
  return (
    <svg
      style={style}
      viewBox="0 0 31 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <path
        d="M1.17117 20.3177C1.12473 19.4676 1.08187 18.6174 1.03186 17.7673C0.98364 16.935 0.928274 16.1028 0.87648 15.2705C0.837188 14.6329 0.797896 13.9953 0.76039 13.3577C0.706811 12.42 0.656803 11.4806 0.601437 10.543C0.549644 9.67497 0.492492 8.80876 0.440698 7.94077C0.428196 7.72824 0.413909 7.51571 0.406765 7.30317C0.372831 6.2923 0.251384 5.28858 0.144224 4.28307C0.0835005 3.71869 0.0442084 3.15253 0.00848855 2.58638C-0.0183013 2.17738 0.0209899 1.77018 0.0888576 1.36833C0.124577 1.16115 0.187087 0.953984 0.267457 0.759311C0.403192 0.428902 0.658589 0.219939 1.00329 0.119923C1.24261 0.0502694 1.48729 0.0127592 1.73554 0.00382925C2.21597 -0.0122447 2.69283 0.0252624 3.16969 0.0609823C3.46974 0.0824142 3.77157 0.10742 4.07162 0.10742C6.4827 0.110992 8.89379 0.109209 11.3049 0.110995C11.571 0.110995 11.8371 0.11278 12.1014 0.132426C12.3122 0.1485 12.5265 0.177076 12.7301 0.232441C13.2588 0.371749 13.5802 0.720012 13.6999 1.25402C13.782 1.62015 13.7999 1.98986 13.7785 2.36491C13.7053 3.62225 13.6427 4.87959 13.5659 6.13693C13.4838 7.49964 13.3873 8.86235 13.3016 10.2251C13.2516 11.0038 13.2105 11.7824 13.1659 12.5629C13.1248 13.2541 13.0855 13.9435 13.0444 14.6347C12.9944 15.4669 12.9373 16.2992 12.8908 17.1315C12.8355 18.1048 12.7873 19.08 12.7337 20.0534C12.6819 20.9749 12.6283 21.8947 12.5747 22.8163C12.5711 22.8877 12.564 22.9574 12.5604 23.0288C12.514 23.9683 12.4676 24.9059 12.4229 25.8453C12.3622 27.1384 12.2997 28.4314 12.2461 29.7263C12.2157 30.4532 12.2068 31.1801 12.18 31.907C12.1657 32.3142 12.1354 32.7214 12.1157 33.1286C12.0996 33.4501 12.0193 33.7591 11.9193 34.0627C11.7103 34.6931 11.2924 35.1236 10.6655 35.3432C10.2958 35.4736 9.91181 35.5433 9.52067 35.5718C8.83128 35.6201 8.1401 35.6379 7.44893 35.6058C6.70595 35.5701 5.9612 35.554 5.21644 35.5236C4.89853 35.5111 4.57884 35.4933 4.26093 35.4683C3.9591 35.445 3.6662 35.37 3.38222 35.2664C2.74998 35.036 2.29277 34.611 2.03737 33.9859C1.89628 33.6412 1.78376 33.2893 1.75162 32.9125C1.71768 32.5232 1.68553 32.1356 1.69089 31.7445C1.69268 31.4783 1.68732 31.2122 1.69625 30.9461C1.73197 29.8817 1.68196 28.819 1.60159 27.7563C1.54623 27.0134 1.51408 26.2686 1.47122 25.5256C1.41049 24.4808 1.3462 23.436 1.28547 22.3912C1.24439 21.7001 1.20689 21.0107 1.16938 20.3195C1.17295 20.3177 1.17117 20.3177 1.17117 20.3177ZM2.825 29.1476C2.88751 29.1387 2.95895 29.1351 3.02681 29.1208C3.34115 29.0548 3.65905 29.028 3.97875 29.0315C4.29844 29.0351 4.61813 29.0369 4.93425 29.0637C5.99513 29.153 7.05779 29.1798 8.12224 29.1673C8.75984 29.1601 9.39923 29.1637 10.0368 29.1673C10.1779 29.1673 10.3208 29.1726 10.4601 29.1923C10.6726 29.2244 10.8352 29.4191 10.8495 29.6388C10.8709 29.9424 10.6601 30.1996 10.3583 30.2246C10.1994 30.2371 10.0386 30.2335 9.87966 30.2335C7.75254 30.2335 5.62543 30.2335 3.49653 30.2335C3.33757 30.2335 3.17684 30.2335 3.01788 30.2389C2.85893 30.2442 2.78035 30.3103 2.77142 30.455C2.7357 31.1104 2.69819 31.7677 2.75534 32.4213C2.77856 32.6839 2.85357 32.9429 2.9143 33.2C2.93394 33.284 2.97859 33.3661 3.0286 33.4376C3.38758 33.9555 3.86266 34.2948 4.4949 34.4056C4.94854 34.486 5.40397 34.561 5.86297 34.5949C6.21659 34.6199 6.57022 34.6378 6.92384 34.6681C7.36677 34.7056 7.8097 34.7056 8.25262 34.6896C8.74913 34.6735 9.24206 34.6145 9.72785 34.5074C10.0154 34.4449 10.2583 34.302 10.4476 34.0805C10.6583 33.8376 10.8012 33.5519 10.9245 33.2572C10.9513 33.1929 10.953 33.1197 10.9638 33.0482C10.9709 33.0036 10.9227 32.9321 10.8816 32.9304C10.7048 32.9232 10.528 32.9125 10.3512 32.9125C8.20619 32.9107 6.06121 32.9125 3.91445 32.9107C3.73764 32.9107 3.55904 32.9125 3.38401 32.8946C3.11968 32.8679 2.94109 32.6553 2.9393 32.3838C2.93751 32.132 3.1304 31.8927 3.38222 31.8641C3.55725 31.8427 3.73585 31.8463 3.91266 31.8463C6.09336 31.8445 8.27405 31.8463 10.4547 31.8445C10.6316 31.8445 10.8084 31.8427 10.987 31.8373C11.1066 31.8338 11.1763 31.7712 11.1906 31.6391C11.212 31.4462 11.2352 31.2515 11.237 31.0568C11.2442 30.3657 11.2424 29.6727 11.2442 28.9815C11.2442 28.3082 11.2245 27.6331 11.2495 26.9598C11.2834 26.0382 11.3477 25.1184 11.4031 24.1969C11.446 23.4878 11.4924 22.7806 11.5353 22.0733C11.5371 22.0394 11.5299 22.0037 11.5281 21.968C11.5263 21.9251 11.4478 21.8769 11.4085 21.8983C11.2852 21.9679 11.162 22.0376 11.0406 22.109C9.29564 23.1056 7.43285 23.445 5.45398 23.1021C4.57348 22.9485 3.74478 22.6413 2.96073 22.2126C2.88393 22.1698 2.80892 22.1198 2.73927 22.0662C2.63389 21.9858 2.58746 21.8697 2.5821 21.7411C2.56781 21.3571 2.95359 21.075 3.309 21.2089C3.40723 21.2464 3.50367 21.2946 3.59654 21.3446C4.30737 21.7233 5.06463 21.9501 5.86118 22.0715C7.58288 22.3323 9.17241 21.9822 10.6548 21.091C10.9441 20.9178 11.2138 20.7177 11.471 20.4981C11.5871 20.3998 11.646 20.2802 11.6496 20.1284C11.6549 19.9694 11.6639 19.8087 11.6728 19.6497C11.6853 19.4015 11.6942 19.1532 11.7085 18.905C11.7621 18.037 11.8192 17.1708 11.8693 16.3028C11.955 14.8329 12.0354 13.363 12.1211 11.8932C12.1586 11.2377 12.1979 10.5823 12.2372 9.92858C12.2979 8.9195 12.3604 7.91041 12.4229 6.90132C12.4443 6.56556 12.4693 6.2298 12.489 5.89225C12.5051 5.62613 12.5158 5.36002 12.5247 5.09569C12.5283 4.96889 12.4586 4.88852 12.3425 4.88494C12.1657 4.87959 11.9889 4.8778 11.8103 4.8778C8.83128 4.8778 5.85404 4.8778 2.875 4.8778C2.71605 4.8778 2.55531 4.87602 2.39636 4.87602C2.26955 4.87602 2.15168 4.84386 2.03737 4.79028C1.8427 4.6992 1.73554 4.49024 1.76769 4.26164C1.79805 4.04553 1.97129 3.86157 2.18025 3.83299C2.26777 3.82049 2.35707 3.81692 2.44458 3.81514C2.60353 3.81157 2.76427 3.81335 2.92323 3.81335C5.93798 3.81335 8.95094 3.81335 11.9657 3.81335C12.1425 3.81335 12.3193 3.81156 12.4979 3.80799C12.614 3.80442 12.7033 3.7294 12.7194 3.61867C12.7605 3.32041 12.8105 3.02216 12.8337 2.72211C12.8533 2.47565 12.8462 2.2256 12.8408 1.97735C12.8355 1.76124 12.7712 1.55765 12.6408 1.38083C12.5533 1.26117 12.4372 1.18258 12.2854 1.17365C12.1622 1.16651 12.0371 1.1683 11.9139 1.17009C11.6835 1.17366 11.4531 1.18437 11.2227 1.18437C9.50281 1.18615 7.7829 1.18615 6.063 1.18437C5.86832 1.18437 5.67187 1.18616 5.47898 1.17009C4.84317 1.11829 4.20735 1.06471 3.57333 1.0022C3.07682 0.953981 2.5821 0.952194 2.0856 0.9897C1.91057 1.0022 1.73554 1.04685 1.56766 1.09864C1.40871 1.14865 1.29619 1.25939 1.24797 1.42727C1.18724 1.63266 1.14616 1.84161 1.14795 2.05593C1.15331 2.58816 1.14974 3.12038 1.17831 3.65082C1.21046 4.21698 1.27833 4.78135 1.32655 5.34751C1.37656 5.92974 1.42478 6.51377 1.46586 7.09779C1.50694 7.68181 1.5373 8.26583 1.57302 8.84985C1.5748 8.88557 1.58552 8.91949 1.59088 8.95343C1.59802 8.99986 1.67482 9.03916 1.71411 9.01415C1.77305 8.97665 1.83734 8.9445 1.89092 8.89985C2.67497 8.27297 3.54654 7.8104 4.50383 7.50678C5.07892 7.32461 5.66651 7.18888 6.27017 7.14423C6.99707 7.09243 7.72218 7.11565 8.44194 7.24959C9.44745 7.43534 10.3851 7.79254 11.2549 8.32655C11.4799 8.46586 11.6996 8.62124 11.9014 8.79269C12.1961 9.04273 12.1443 9.4928 11.8139 9.69998C11.7014 9.76963 11.5817 9.79642 11.462 9.72855C11.3085 9.64104 11.1584 9.54816 11.012 9.44815C10.5101 9.10881 9.98324 8.82306 9.41173 8.61588C8.23655 8.19082 7.03279 8.08008 5.80046 8.29262C4.26629 8.55516 2.95537 9.24276 1.86592 10.3554C1.73197 10.4912 1.66053 10.6341 1.68196 10.8269C1.69982 10.9859 1.69804 11.1466 1.70697 11.3056C1.75876 12.12 1.81412 12.9344 1.86413 13.7488C1.93736 14.9526 2.00701 16.1563 2.07667 17.3601C2.15168 18.6531 2.22312 19.9462 2.29813 21.2375C2.36064 22.3359 2.42672 23.4325 2.49102 24.5308C2.53924 25.3631 2.58924 26.1954 2.63389 27.0277C2.66783 27.6474 2.6964 28.2671 2.72855 28.8869C2.73212 28.9405 2.73748 28.994 2.75177 29.044C2.76784 29.0851 2.79642 29.1101 2.825 29.1476Z"
        fill="#380E63"
      />
      <path
        d="M30.9722 23.4416C30.9722 26.492 30.9722 29.5443 30.9704 32.5948C30.9704 32.9323 30.9633 33.2681 30.9436 33.6056C30.9347 33.7807 30.899 33.9575 30.865 34.1307C30.715 34.8808 30.2274 35.2898 29.5059 35.4523C29.2987 35.4988 29.088 35.5327 28.8754 35.5506C28.186 35.6113 27.4984 35.6684 26.8055 35.6577C26.0429 35.6452 25.282 35.6399 24.5194 35.5988C23.705 35.5559 22.8888 35.5541 22.0744 35.5309C21.8797 35.5256 21.685 35.5095 21.4939 35.4827C21.3475 35.4613 21.2332 35.372 21.1564 35.2452C20.9349 34.8755 21.2243 34.5075 21.5189 34.4718C21.6243 34.4593 21.7315 34.4504 21.8369 34.4558C22.6155 34.4968 23.396 34.5093 24.1747 34.5701C25.0588 34.6397 25.9446 34.6915 26.8305 34.6683C27.4163 34.654 28.0003 34.6219 28.5754 34.4986C28.7308 34.4647 28.8862 34.429 29.038 34.3772C29.2791 34.2968 29.4809 34.1521 29.6309 33.945C29.8202 33.6842 29.9685 33.402 29.9881 33.0716C30.0006 32.8591 30.0167 32.6465 30.0113 32.434C30.0006 32.0447 29.9917 31.6535 29.956 31.2642C29.9149 30.8213 29.906 30.3783 29.906 29.9354C29.906 25.0561 29.906 20.1786 29.906 15.2992C29.906 14.9438 29.9167 14.5902 29.9131 14.2348C29.9113 13.9687 29.9077 13.7026 29.881 13.4382C29.8363 12.9899 29.5916 12.6881 29.1666 12.5345C28.8987 12.4381 28.6218 12.3881 28.3379 12.3577C27.0644 12.2255 25.7875 12.2398 24.5123 12.272C23.3424 12.3005 22.1744 12.372 21.0028 12.3648C20.6831 12.3631 20.3652 12.3845 20.0526 12.4613C19.5954 12.5738 19.3007 12.8417 19.2132 13.315C19.1882 13.4543 19.1632 13.5936 19.1525 13.7347C19.14 13.9115 19.1418 14.0883 19.1418 14.2669C19.1418 19.4641 19.1418 24.6632 19.1436 29.8604C19.1436 30.3212 19.1204 30.782 19.0704 31.241C19.0078 31.8232 19.0025 32.409 19.0257 32.9948C19.0382 33.3002 19.115 33.5896 19.2293 33.8699C19.3329 34.1253 19.4901 34.3307 19.7597 34.4343C19.8258 34.4593 19.8883 34.495 19.9473 34.5326C20.1312 34.6486 20.2312 34.8951 20.1777 35.0844C20.1062 35.338 19.8723 35.5166 19.624 35.4952C19.5186 35.4863 19.4115 35.4631 19.3132 35.4273C18.9185 35.2773 18.6042 35.0255 18.3935 34.6576C18.297 34.4897 18.2202 34.3075 18.1613 34.1236C18.0523 33.786 17.988 33.4342 17.9863 33.0788C17.9845 32.6716 17.9988 32.2626 18.013 31.8554C18.0291 31.4124 18.0684 30.9695 18.0684 30.5266C18.0738 26.8724 18.072 23.2183 18.0702 19.5624C18.0702 18.8533 18.0488 18.1443 18.0059 17.4353C17.947 16.4619 17.938 15.485 17.9505 14.5098C17.9559 13.9937 18.0059 13.4829 18.0791 12.9739C18.0898 12.9042 18.1023 12.8346 18.1166 12.7649C18.2845 12.0166 18.7364 11.554 19.4883 11.3754C19.7669 11.3093 20.0509 11.3075 20.3313 11.2754C20.4009 11.2682 20.4563 11.2039 20.4581 11.1307C20.4581 11.095 20.4563 11.0593 20.4563 11.0253C20.4545 10.6342 20.4545 10.2449 20.4545 9.85374C20.4545 8.78929 20.4545 7.72484 20.4545 6.66039C20.4545 6.50143 20.4545 6.3407 20.4741 6.18353C20.5063 5.92099 20.7045 5.72274 20.9617 5.69416C21.1189 5.6763 21.2796 5.67809 21.4404 5.67809C22.9656 5.67631 24.4908 5.67809 26.0143 5.6763C26.1911 5.6763 26.3679 5.67095 26.5447 5.6638C26.634 5.66023 26.7001 5.58522 26.7072 5.48878C26.7126 5.39948 26.7162 5.31197 26.7162 5.22267C26.7162 4.37075 26.718 3.51882 26.7162 2.66869C26.7162 2.56332 26.7126 2.45438 26.693 2.35079C26.6858 2.30793 26.6376 2.26149 26.5965 2.24006C26.5519 2.21684 26.4929 2.21505 26.4411 2.21505C25.2713 2.21327 24.1015 2.21327 22.9299 2.21327C22.8781 2.21327 22.8245 2.22755 22.7727 2.2347C22.712 2.24184 22.6691 2.29185 22.6638 2.3365C22.6459 2.45795 22.6423 2.58297 22.6405 2.70799C22.6388 3.34737 22.6423 3.98497 22.6388 4.62435C22.6388 4.76545 22.6352 4.91012 22.603 5.04586C22.553 5.25125 22.4066 5.38161 22.2012 5.42626C21.9904 5.47091 21.8136 5.39234 21.6886 5.22267C21.6386 5.1548 21.6011 5.06549 21.5886 4.98155C21.569 4.84225 21.5707 4.69936 21.5707 4.55649C21.569 3.98854 21.5707 3.4206 21.569 2.85265C21.569 2.72942 21.5636 2.6044 21.5564 2.48117C21.5511 2.39365 21.4671 2.32757 21.3707 2.33471C21.2118 2.34721 21.0528 2.35793 20.8938 2.38115C19.9116 2.52046 18.9293 2.66155 17.947 2.80264C17.7541 2.83122 17.563 2.86516 17.3701 2.89909C17.2826 2.91517 17.2183 2.99196 17.2147 3.08662C17.2093 3.20985 17.2111 3.33487 17.2058 3.45811C17.2022 3.54562 17.1986 3.6367 17.1826 3.72243C17.1379 3.96711 16.8861 4.16358 16.6468 4.15107C16.3932 4.13857 16.161 3.93497 16.152 3.68136C16.1378 3.25629 16.1378 2.82944 16.152 2.40616C16.161 2.15433 16.3289 1.97216 16.5771 1.9293C17.0308 1.8525 17.488 1.7882 17.9434 1.72212C18.856 1.58996 19.7687 1.45958 20.6795 1.3292C20.9956 1.28455 21.31 1.23097 21.6279 1.19704C21.8922 1.16846 22.1583 1.14703 22.4227 1.14525C23.9122 1.13989 25.4017 1.14167 26.8912 1.14346C27.0323 1.14346 27.1752 1.14525 27.3163 1.16133C27.5627 1.18812 27.7467 1.36672 27.7717 1.60782C27.7896 1.76678 27.7896 1.92573 27.7896 2.08647C27.7913 3.0259 27.7896 3.96711 27.7896 4.90654C27.7896 5.04764 27.7878 5.19052 27.7913 5.33161C27.7967 5.56379 27.7931 5.68703 28.12 5.68167C28.1896 5.67988 28.2628 5.69595 28.3289 5.71738C28.5504 5.79061 28.6861 5.9442 28.7147 6.17817C28.7308 6.3014 28.729 6.42642 28.729 6.54966C28.7308 7.61411 28.7308 8.67856 28.729 9.74301C28.729 9.8841 28.7236 10.027 28.7004 10.1663C28.654 10.4217 28.4182 10.5896 28.1557 10.5699C27.9467 10.5538 27.7556 10.4002 27.7003 10.1824C27.6699 10.0645 27.6628 9.93768 27.661 9.81444C27.6556 9.44117 27.6592 9.06968 27.6592 8.69641C27.6592 8.19991 27.661 7.70341 27.6574 7.2069C27.6574 7.10153 27.6467 6.99615 27.6377 6.88899C27.6324 6.82648 27.5592 6.76219 27.4931 6.75683C27.4056 6.74968 27.3163 6.74433 27.2288 6.74255C26.9626 6.74076 26.6965 6.74255 26.4304 6.74255C25.0123 6.74255 23.5943 6.74255 22.1744 6.74255C22.0155 6.74255 21.8565 6.74968 21.6958 6.75683C21.6386 6.75861 21.5565 6.83899 21.5529 6.89435C21.5439 7.03545 21.5332 7.17654 21.5314 7.31763C21.5297 8.18741 21.5314 9.0554 21.5297 9.92517C21.5297 10.3324 21.5225 10.7414 21.5207 11.1486C21.5207 11.2236 21.5725 11.279 21.6529 11.279C21.8297 11.2825 22.0083 11.2915 22.1833 11.2825C23.0692 11.2379 23.955 11.1986 24.8391 11.1379C25.866 11.0682 26.8948 11.0575 27.9217 11.0986C28.4182 11.12 28.9094 11.1968 29.3952 11.3004C29.5327 11.329 29.672 11.3683 29.8042 11.4165C30.3185 11.6076 30.6686 11.963 30.8329 12.4881C30.8847 12.656 30.9258 12.8328 30.9418 13.0078C30.9704 13.3436 30.9883 13.6811 30.9883 14.0169C30.9901 14.7616 30.974 15.5064 30.974 16.2512C30.9704 18.6515 30.9722 21.0465 30.9722 23.4416Z"
        fill="#380E63"
      />
      <path
        d="M28.729 23.3414C28.729 24.5648 28.729 25.79 28.729 27.0134C28.729 27.1723 28.7326 27.3331 28.7129 27.492C28.654 27.9528 28.1735 28.0296 27.9039 27.8599C27.7949 27.7921 27.7288 27.6849 27.6949 27.5617C27.677 27.4938 27.6663 27.4224 27.6628 27.3527C27.6574 27.2295 27.6592 27.1045 27.6592 26.9794C27.6592 24.5308 27.6592 22.0823 27.6592 19.6337C27.6592 19.4747 27.661 19.314 27.6699 19.155C27.6788 19.0282 27.7253 18.9121 27.8128 18.8192C27.9592 18.6639 28.1378 18.6031 28.3432 18.6692C28.545 18.7335 28.679 18.871 28.7076 19.0854C28.729 19.2425 28.7272 19.4033 28.729 19.564C28.7308 20.8213 28.729 22.0805 28.729 23.3414Z"
        fill="#380E63"
      />
      <path
        d="M28.729 31.6304C28.729 31.984 28.729 32.3377 28.729 32.6931C28.729 32.7985 28.7308 32.9056 28.7254 33.011C28.7076 33.3735 28.5986 33.4825 28.2414 33.5021C28.2235 33.5039 28.2057 33.5039 28.1878 33.5039C27.8128 33.5021 27.677 33.3718 27.6574 32.9985C27.6556 32.9628 27.6556 32.9271 27.6556 32.8931C27.6556 32.0787 27.6556 31.2643 27.6556 30.4499C27.6556 30.3624 27.6556 30.2713 27.6699 30.1856C27.6967 30.0212 27.7824 29.8909 27.9235 29.7998C28.2682 29.5783 28.6629 29.8462 28.704 30.1463C28.7201 30.2677 28.7236 30.3927 28.7236 30.516C28.7308 30.8875 28.729 31.2589 28.729 31.6304Z"
        fill="#380E63"
      />
    </svg>
  );
}

Toiletries.propTypes = {
  style: PropTypes.object,
};

export default {
  aspectRatio: 31 / 36,
  svg: Toiletries,
  title,
};
