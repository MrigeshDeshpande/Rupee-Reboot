export function parseMoney(input) {
    if (input === "" || input === null) return 0;


    return (
        Number(
            String(input)
                .replace(/₹/g, "")
                .replace(/,/g, "")
                .trim()
        ) || 0
    );
}