import '../styles/Description.scss';
import DescriptionSection from './DescriptionSection';

const Description = ({ description }) => {

    function parseJobDescription(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const content = {
            title: "",
            location: "",
            responsibilities: [],
            qualifications: [],
            benefits: [],
            apply: {
                email: "",
                note: ""
            }
        }

        const h1 = doc.querySelector("h1");
        if (h1) {
            content.title = h1.textContent.trim();
        }
        const splitLiToLines = (liEl) => {
            if (!liEl) return [];
            return liEl.innerHTML
                .split(/<br\s*\/?>/i)
                .map(s => s.replace(/<[^>]+>/g, "").trim())
                .filter(Boolean);
        };
        const h2List = doc.querySelectorAll("h2");

        h2List.forEach((h2) => {
            const title = h2.textContent.trim();


            const next = h2.nextElementSibling;
            const ul = next && next.tagName === "UL" ? next : null;
            const li = ul ? ul.querySelector("li") : null;
            const lines = splitLiToLines(li);

            if (title.startsWith("工作地點")) {
                content.location = title.replace("工作地點：", "").trim();
            }

            if (title.includes("職責") || title.includes("要求")) {
                content.responsibilities.push(...lines);
            } else if (title.includes("資格")) {
                content.qualifications.push(...lines);
            } else if (title.includes("我們提供") || title.includes("福利")) {
                content.benefits.push(...lines);
            }
        });

        const p = doc.querySelector("p");
        if (p) {
            const mail = p.querySelector('a[href^="mailto:"]');
            if (mail) content.apply.email = mail.textContent.trim();
            content.apply.note = p.textContent.replace(/\s+/g, " ").trim();
        }

        return content;
    }


    const descriptionJson = parseJobDescription(description);

    return (
        <div className='job-description'>
            <h1>工作內容</h1>
            <h2>
                【職位：{descriptionJson.title}】
            </h2>

            {descriptionJson.location && (
                <h2>
                    【工作地點：{descriptionJson.location}】
                </h2>
            )}

            <DescriptionSection title="職責與要求" items={descriptionJson.responsibilities} />
            <DescriptionSection title="資格" items={descriptionJson.qualifications} />
            <DescriptionSection title="我們提供" items={descriptionJson.benefits} />

            {descriptionJson.apply?.email && (
                <p>
                    如果您渴望挑戰自我，想要加入一個充滿活力和機會的團隊，請將您的履歷寄至{" "}
                    <a href={`mailto:${descriptionJson.apply.email}`}>{descriptionJson.apply.email}</a>。
                </p>
            )}

        </div>
    );
}

export default Description;
