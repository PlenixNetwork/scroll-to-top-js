(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory();
    } else {
        global.ScrollToTop = factory();
    }
})(typeof window !== "undefined" ? window : this, function () {

    function createScrollToTopButton(options = {}) {
        const defaultOptions = {
            backgroundColor: "#333",
            textColor: "#fff",
            hoverBackgroundColor: "#555",
            hoverTextColor: "#fff",
            hoverBorderColor: "#fff",
            borderColor: "#fff",
            borderSize: "2px",
            animationDuration: 900
        };

        const finalOptions = Object.assign({}, defaultOptions, options);

        if (document.getElementById("scrollToTopBtn")) return;

        const button = document.createElement("button");
        button.id = "scrollToTopBtn";
        button.innerHTML = "&#8679;";

        const buttonStyles = {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: finalOptions.backgroundColor,
            color: finalOptions.textColor,
            border: `${finalOptions.borderSize} solid ${finalOptions.borderColor}`,
            cursor: "pointer",
            fontSize: "34px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            zIndex: "1000",
            opacity: "0",
            transform: "translateY(20px)",
            transition: "opacity 0.4s ease, transform 0.4s ease, background 0.3s ease, transform 0.3s ease, border 0.3s ease, color 0.3s ease",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)"
        };

        Object.assign(button.style, buttonStyles);

        button.onmouseover = function () {
            button.style.background = finalOptions.hoverBackgroundColor;
            button.style.color = finalOptions.hoverTextColor;
            button.style.borderColor = finalOptions.hoverBorderColor;
            button.style.transform = "scale(1.15)";
        };

        button.onmouseout = function () {
            button.style.background = finalOptions.backgroundColor;
            button.style.color = finalOptions.textColor;
            button.style.borderColor = finalOptions.borderColor;
            button.style.transform = "scale(1)";
        };

        document.body.appendChild(button);

        button.addEventListener("click", function () {
            smoothScrollToTop(finalOptions.animationDuration);
        });

        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                button.style.opacity = "1";
                button.style.transform = "translateY(0)";
            } else {
                button.style.opacity = "0";
                button.style.transform = "translateY(20px)";
            }
        });
    }

    function smoothScrollToTop(duration) {
        let currentPosition = window.scrollY;
        const start = performance.now();

        function animateScroll(timestamp) {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeInOut = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            window.scrollTo(0, currentPosition * (1 - easeInOut));

            if (elapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            createScrollToTopButton();
        });
    } else {
        createScrollToTopButton();
    }

    return function (options) {
        if (options && Object.keys(options).length > 0) {
            createScrollToTopButton(options);
        } else {
            createScrollToTopButton();
        }
    };
});
