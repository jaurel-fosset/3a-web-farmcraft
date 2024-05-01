function toolClicked(event)
{
    tools = document.querySelectorAll("tool");
    for (tool of tools)
    {
        tool.classList.toggle("active", tool === event.target);
    }
}

function fieldPartClicked(event)
{
    const tool = document.querySelector(".active");

    switch(tool.id)
    {
        case "tool-hoe":
            event.target.classList.remove("grass");
            event.target.classList.add("farmland");
            break;
        case "tool-water":
            event.target.classList.add("hydrated");
            break;
        case "tool-sow":
            event.target.dataset.seed = 1;
            break;
        case "tool-harvest":
            if (event.target.dataset.seed === "7")
            {
                wheat_stock = document.querySelector("#stock-wheat");
                wheat_stock.innerText = +wheat_stock.innerText + 1;
            }
            event.target.dataset.seed = 0;
            break;
    }
}

function grow()
{
    field_parts = document.querySelectorAll("field-part");

    for (field_part of field_parts)
    {
		if (field_part.classList.contains("farmland")
			&& !field_part.classList.contains("hydrated")
			&& field_part.dataset.seed === "0"
			&& Math.random() <= 0.01)
		{
			field_part.classList.remove("farmland");
			field_part.classList.add("grass");
		}
		
		if (field_part.dataset.seed === "0" || field_part.dataset.seed >= 7)
		{
			continue;
		}

		if (field_part.classList.contains("hydrated"))
		{
			if (Math.random() <= 0.30)
			{
				field_part.dataset.seed++;
			}
		}
		else
		{
			if (Math.random() <= 0.05)
			{
				field_part.dataset.seed++;
			}
		}

    }

    setTimeout(grow, 1000);
}

function generateFields()
{
    const field_parts = document.querySelector("field-parts");

    for (let i = 0; i < 25; i++)
    {
        const field_part = document.createElement("field-part");
		field_part.dataset.seed = 0;
        field_part.classList.add("grass");
        field_part.addEventListener("click", fieldPartClicked);
        field_parts.append(field_part);
    }

    setTimeout(grow, 1000);
}
window.addEventListener("load", generateFields);

function attachToolsEvent()
{
    tools = document.querySelectorAll("tool");
    for (tool of tools)
    {
        tool.addEventListener("click", toolClicked);
    }
}
window.addEventListener("load", attachToolsEvent);