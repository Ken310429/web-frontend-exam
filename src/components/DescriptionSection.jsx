

const DescriptionSection = ({ title, items }) => {
    if (!items?.length) return null;

    return (
        <section>
            <h3>【{title}】</h3>
            <ul>
                {items.map((x, i) => (
                    <li key={i}>{x}</li>
                ))}
            </ul>
        </section>
    );
}

export default DescriptionSection;
