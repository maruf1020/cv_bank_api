SwymWishlistPlusToastAPI.init = async () => {
    const addProductToList = async (lid) => {
        var product = {
            epi: window?.SwymPageData?.epi,
            empi: window?.SwymPageData?.empi,
            du: window?.SwymPageData?.du,
            source: "auto-wishlist",
        };
        let onSuccess = function (addedListItem) {
            const addToWishlistBtn = document.querySelector(
                ".swym-add-to-wishlist"
            );
            const addToWishlistBtnText =
                document.querySelector(".swym-wishlist-cta");
            if (addToWishlistBtnText) {
                addToWishlistBtnText.textContent =
                    window._swat.retailerSettings.Strings.WishlistAddedCTA;
            }
            addToWishlistBtn?.classList.add("swym-added");
            displayNotification("success");
        };
        let onError = function (error) {
            window._swat.utils?.log("Error while fetching list");
        };
        await window._swat.addToList(lid, product, onSuccess, onError);
    };
    const createAndAddToList = async (listName) => {
        window._swat.createList(
            { lname: listName },
            async (res) => {
                if (res?.lid) {
                    try {
                        await addProductToList(res.lid);
                    } catch (error) {
                        window._swat.utils.log(
                            "Error while adding item to the new list",
                            error
                        );
                    }
                } else {
                    window._swat.utils.log("List creation failed");
                }
            },
            () => {
                window._swat.utils.log("Error while creating the list");
            }
        );
    };
    async function handleWishlistAction() {
        const onSuccess = async (lists) => {
            try {
                if (!lists || lists?.length === 0) {
                    return createAndAddToList("My Smart WishList");
                }
                let myWishlist;
                if (!window._swat?.retailerSettings.Wishlist.EnableCollections) {
                    myWishlist = lists?.find((list) => list?.lname === "My Wishlist");
                } else {
                    myWishlist = lists?.find(
                        (list) => list?.lname === "My Smart WishList"
                    );
                }
                if (myWishlist) {
                    return await addProductToList(myWishlist.lid);
                }
                return createAndAddToList("My Smart WishList");
            } catch (error) {
                window._swat.utils.log("Error in onSuccess function", error);
            }
        };
        const onError = () => {
            window._swat.utils?.log("Error while fetching list");
        };
        await window._swat.fetchLists({
            callbackFn: onSuccess,
            errorFn: onError,
        });
    }
    const removeProductFromList = async (lid) => {
        let product = {
            epi: window.SwymPageData.epi, // unique variant id  per listid
            empi: window.SwymPageData.empi, // product id
            du: window.SwymPageData.du, // product url.
        };
        let onSuccess = function (deletedProduct) {
            window._swat?.instrumentV3(801, { epi: window.SwymPageData.epi, empi: window.SwymPageData.empi, "utm-term": "auto-wishlist", "utm-medium": "proactive-wishlist" });
            const addToWishlistBtn = document.querySelector(
                ".swym-add-to-wishlist"
            );
            const addToWishlistBtnText =
                document.querySelector(".swym-wishlist-cta");
            if (addToWishlistBtnText) {
                addToWishlistBtnText.textContent =
                    window._swat.retailerSettings.Strings.WishlistAddCTA;
            }
            addToWishlistBtn?.classList.remove("swym-added");
            // Show toast notification for item removal
            displayNotification("remove");
            // Retrieve and update the undo click count
            let undoClickCount =
                parseInt(window._swat.storage.getLocal("undo-click-count")) || 0;
            undoClickCount = Math.min(undoClickCount + 1, 3); // Ensure it does not exceed 3
            window._swat.storage.setLocal(
                "undo-click-count",
                JSON.stringify(undoClickCount)
            );
        };
        let onError = function (error) {
            console.log("Error while deleting the Product", error);
        };
        window._swat.deleteFromList(lid, product, onSuccess, onError);
    };
    function getCountByEpi(data, epi) {
        const item = data?.find((product) => product.epi === epi);
        return item ? item.cnt : null;
    }
    async function undoWishlistAddition() {
        if (toastTimeout) {
            clearTimeout(toastTimeout);
            let toast = document.querySelector(".swym-toast");
            if (toast) {
                toast.remove();
            }
        }
        const onSuccess = async (lists) => {
            try {
                let myWishlist;
                if (!window._swat?.retailerSettings.Wishlist.EnableCollections) {
                    myWishlist = lists?.find((list) => list.lname === "My Wishlist");
                } else {
                    myWishlist = lists?.find(
                        (list) => list.lname === "My Smart WishList"
                    );
                }
                if (myWishlist) {
                    return await removeProductFromList(myWishlist.lid);
                }
            } catch (error) {
                window._swat.utils.log(
                    "[Remove from Wishlist] Error in onSuccess function ",
                    error
                );
            }
        };
        const onError = () => {
            window._swat.utils?.log("Error while fetching list");
        };
        await window._swat.fetchLists({
            callbackFn: onSuccess,
            errorFn: onError,
        });
    }
    function shouldShowNotification() {
        let notifications =
            JSON.parse(window._swat.storage.getLocal("autoWishlistedProducts")) ||
            [];
        if (notifications?.includes(window.SwymPageData?.epi)) {
            return false;
        } else {
            return true;
        }
    }
    function displayNotification(notification) {
        const settings = window.swymWishlistToastSettings;
        window._swat.ui.uiRef.settings.UI.WishlistShowNotification = false;
        let toastPosition = settings.wishlistToastPosition;
        let toast = document.querySelector(".swym-toast");
        if (!toast) {
            toast = document.createElement("div");
            const positionClasses = {
                TopLeft: "swym-toast swym-toast-top-left",
                TopCenter: "swym-toast swym-toast-top-center",
                TopRight: "swym-toast swym-toast-top-right",
                BottomLeft: "swym-toast swym-toast-bottom-left",
                BottomCenter: "swym-toast swym-toast-bottom-center",
                BottomRight: "swym-toast swym-toast-bottom-right",
            };

            toast.className =
                positionClasses[toastPosition] ||
                "swym-toast swym-toast-bottom-right";
            document.body.appendChild(toast);
        }
        if (notification === "success") {
            toast.innerHTML = `<img class="swym-toast-product-img" src=${window?.SwymPageData?.iu || window.location.protocol + window?.SwymProductInfo?.product?.featured_image} alt="icon">
              <div class="swym-toast-content"><span>${settings.wishlistToast1Title} <span class="swym-toast-emoji">💕</span></span><p>${settings.wishlistToast1Description}<span class="swym-toast-emoji">✨</span></p></div>
              <span class="swym-toast-undo" id="swymUndo">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <mask id="mask0_755_4265" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
                      <rect width="14" height="14" fill="#D9D9D9"/>
                  </mask>
                  <g mask="url(#mask0_755_4265)">
                      <path d="M4.08325 11.0835V9.91683H8.22492C8.83742 9.91683 9.36971 9.72238 9.82179 9.3335C10.2739 8.94461 10.4999 8.4585 10.4999 7.87516C10.4999 7.29183 10.2739 6.80572 9.82179 6.41683C9.36971 6.02794 8.83742 5.8335 8.22492 5.8335H4.54992L6.06659 7.35016L5.24992 8.16683L2.33325 5.25016L5.24992 2.3335L6.06659 3.15016L4.54992 4.66683H8.22492C9.16797 4.66683 9.97735 4.97308 10.653 5.58558C11.3287 6.19808 11.6666 6.96127 11.6666 7.87516C11.6666 8.78905 11.3287 9.55225 10.653 10.1647C9.97735 10.7772 9.16797 11.0835 8.22492 11.0835H4.08325Z" fill="${window.swymWishlistToastSettings.wishlistToastTextColor}"/>
                  </g>
                  </svg>${settings.wishlistToastUndoText}
              </span>
          <div class="swym-progress-bar"></div>
          <span class="swym-toast-heart-background" style="position: absolute">
          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="22" viewBox="0 0 31 22" fill="none">
              <path d="M7.8143 16.7802C9.7626 9.48046 18.6652 11.2815 21.4596 12.5307C21.0854 9.04977 25.6494 2.69238 30.9617 3.29688C41.78 4.52794 37.983 23.8662 32.7208 31.8633C21.7066 32.1142 5.21499 26.519 7.8143 16.7802Z" fill="#FFB9C3"/>
              <path d="M4.39313 13.1991C6.52975 12.6725 7.31874 15.1976 7.39182 16.0861C8.22788 15.5024 10.4908 15.7756 11.0817 17.2165C12.2849 20.1507 6.81595 21.8939 4.03649 21.6724C2.42754 18.8961 1.54257 13.9016 4.39313 13.1991Z" fill="#FFB9C3" stroke="#262626" stroke-width="2"/>
          </svg></span>
          `;
            // To handle the visibility of toast notification.
            let notifications =
                JSON.parse(window._swat.storage.getLocal("autoWishlistedProducts")) ||
                [];
            notifications.push(window.SwymPageData.epi);
            window._swat.storage.setLocal(
                "autoWishlistedProducts",
                JSON.stringify(notifications)
            );

            document
                .getElementById("swymUndo")
                .addEventListener("click", undoWishlistAddition);
        } else if (notification === "feedback") {
            toast.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" fill="url(#pattern0_761_4602)"/>
                <defs>
                <pattern id="pattern0_761_4602" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_761_4602" transform="scale(0.00666667)"/>
                </pattern>
        <image id="image0_761_4602" width="150" height="150" xlink:href="data:image/png;base64,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"/>
                </defs>
                </svg>
                <div class="swym-toast-content"><span>${settings.wishlistToast3Title}</span><p class="swym-feedback-description">${settings.wishlistToast3Description} <span class="swym-toast-emoji">🪄</span></p></div>
                <p class="swym-feedback-thumb"><span class="swym-thumb-down" id="swym-disable-toast"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <mask id="mask0_761_4585" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
            <rect width="18" height="18" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_761_4585)">
            <path d="M4.49988 2.25H12.7499V12L7.49988 17.25L6.56238 16.3125C6.47488 16.225 6.403 16.1062 6.34675 15.9562C6.2905 15.8062 6.26238 15.6625 6.26238 15.525V15.2625L7.08738 12H2.24988C1.84988 12 1.49988 11.85 1.19988 11.55C0.899878 11.25 0.749878 10.9 0.749878 10.5V9C0.749878 8.9125 0.762378 8.81875 0.787378 8.71875C0.812378 8.61875 0.837378 8.525 0.862378 8.4375L3.11238 3.15C3.22488 2.9 3.41238 2.6875 3.67488 2.5125C3.93738 2.3375 4.21238 2.25 4.49988 2.25ZM11.2499 3.75H4.49988L2.24988 9V10.5H8.99988L7.98738 14.625L11.2499 11.3625V3.75ZM12.7499 12V10.5H14.9999V3.75H12.7499V2.25H16.4999V12H12.7499Z" fill="${window.swymWishlistToastSettings.wishlistToastTextColor}"/>
          </g>
        </svg></span><span class="swym-thumb-up" id="swym-show-toast"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <mask id="mask0_761_4589" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
            <rect width="18" height="18" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_761_4589)">
            <path d="M13.5 15.75H5.25V6L10.5 0.75L11.4375 1.6875C11.525 1.775 11.5969 1.89375 11.6531 2.04375C11.7094 2.19375 11.7375 2.3375 11.7375 2.475V2.7375L10.9125 6H15.75C16.15 6 16.5 6.15 16.8 6.45C17.1 6.75 17.25 7.1 17.25 7.5V9C17.25 9.0875 17.2375 9.18125 17.2125 9.28125C17.1875 9.38125 17.1625 9.475 17.1375 9.5625L14.8875 14.85C14.775 15.1 14.5875 15.3125 14.325 15.4875C14.0625 15.6625 13.7875 15.75 13.5 15.75ZM6.75 14.25H13.5L15.75 9V7.5H9L10.0125 3.375L6.75 6.6375V14.25ZM5.25 6V7.5H3V14.25H5.25V15.75H1.5V6H5.25Z" fill="${window.swymWishlistToastSettings.wishlistToastTextColor}"/>
          </g>
        </svg></span></p>
                <div class="swym-progress-bar"></div>
            <span class="swym-toast-heart-background" style="position: absolute">
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="22" viewBox="0 0 31 22" fill="none">
                <path d="M7.8143 16.7802C9.7626 9.48046 18.6652 11.2815 21.4596 12.5307C21.0854 9.04977 25.6494 2.69238 30.9617 3.29688C41.78 4.52794 37.983 23.8662 32.7208 31.8633C21.7066 32.1142 5.21499 26.519 7.8143 16.7802Z" fill="#FFB9C3"/>
                <path d="M4.39313 13.1991C6.52975 12.6725 7.31874 15.1976 7.39182 16.0861C8.22788 15.5024 10.4908 15.7756 11.0817 17.2165C12.2849 20.1507 6.81595 21.8939 4.03649 21.6724C2.42754 18.8961 1.54257 13.9016 4.39313 13.1991Z" fill="#FFB9C3" stroke="#262626" stroke-width="2"/>
            </svg></span>`;
            document.body.appendChild(toast);
            document
                .getElementById("swym-show-toast")
                ?.addEventListener("click", function () {
                    window._swat.storage.setLocal("swymToastEnabled", "true");
                    window._swat?.instrumentV3(802, { "utm-term": "auto-wishlist", "utm-medium": "proactive-wishlist" });
                    let toast = document.querySelector(".swym-toast");
                    if (toast) {
                        toast.remove();
                    }
                });
            document
                .getElementById("swym-disable-toast")
                .addEventListener("click", function () {
                    window._swat.storage.setLocal("swymToastEnabled", "false");
                    window._swat?.instrumentV3(803, { "utm-term": "auto-wishlist", "utm-medium": "proactive-wishlist" });
                    let toast = document.querySelector(".swym-toast");
                    if (toast) {
                        toast.remove();
                    }
                });
            window._swat.storage.setLocal(
                "undo-click-count",
                JSON.stringify(1)
            );
        } else {
            toast.innerHTML = `<img class="swym-toast-product-img" src=${window?.SwymPageData?.iu || window.location.protocol + window?.SwymProductInfo?.product?.featured_image} alt="icon">
              <div class="swym-toast-content"><span>${window?.SwymPageData?.dt}</span><p>${settings.wishlistToast2Description}</p></div>
          <div class="swym-progress-bar"></div>
          <span class="swym-toast-heart-background" style="position: absolute">
          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="22" viewBox="0 0 31 22" fill="none">
              <path d="M7.8143 16.7802C9.7626 9.48046 18.6652 11.2815 21.4596 12.5307C21.0854 9.04977 25.6494 2.69238 30.9617 3.29688C41.78 4.52794 37.983 23.8662 32.7208 31.8633C21.7066 32.1142 5.21499 26.519 7.8143 16.7802Z" fill="#FFB9C3"/>
              <path d="M4.39313 13.1991C6.52975 12.6725 7.31874 15.1976 7.39182 16.0861C8.22788 15.5024 10.4908 15.7756 11.0817 17.2165C12.2849 20.1507 6.81595 21.8939 4.03649 21.6724C2.42754 18.8961 1.54257 13.9016 4.39313 13.1991Z" fill="#FFB9C3" stroke="#262626" stroke-width="2"/>
          </svg></span>`;
        }
        clearTimeout(toastTimeout);
        setTimeout(() => toast?.classList.add("swym-show"), 100);
        const notificationTimeoutMs = settings.wishlistToastNotificationDelay;
        const delay = notification === "feedback" ? 10000 : notificationTimeoutMs;
        toastTimeout = setTimeout(() => {
            toast.classList.remove("swym-show");
            toast.remove();
            if (notification === "remove") {
                let undoClickCount =
                    parseInt(window._swat.storage.getLocal("undo-click-count")) || 0;
                if (undoClickCount === 3) {
                    setTimeout(() => {
                        displayNotification("feedback");
                        window._swat.ui.uiRef.settings.UI.WishlistShowNotification = true;
                    }, 1000);
                }
            }
            window._swat.ui.uiRef.settings.UI.WishlistShowNotification = true;
        }, delay);
    }
    const result = await SwymWishlistPlusToastAPI.getOnlinervItems();
    const productViewedCount = getCountByEpi(result, window.SwymPageData.epi);
    const isAddedToWishlist = !document
        .querySelector(".swym-add-to-wishlist")
        ?.classList.contains("swym-added");
    const expectedCount =
        parseInt(
            window.swymWishlistToastSettings?.wishlistToastProductViewedCountThresold
        ) - 1;
    if (productViewedCount === expectedCount && isAddedToWishlist) {
        await handleWishlistAction();
    } else if (
        productViewedCount > expectedCount &&
        isAddedToWishlist &&
        shouldShowNotification()
    ) {
        await handleWishlistAction();
    }
};