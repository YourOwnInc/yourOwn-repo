// src/repositories/layout.repo.ts
import { prisma } from "../lib/prisma";
import { layoutItemInput } from "../schemas/layout.schema";

export type CreateLayoutInput = {
  sessionId: string;
  patternId: string;
  experienceId: string;
  position: number;
};

/**
 * Find the layout for a session, or create an empty one if it doesn't exist.
 * Returns layout + its items.
 */
export async function findOrCreateLayoutForSession(sessionId: string) {
  let layout = await prisma.layout.findUnique({
    where: { sessionId },
    include: {
      items: true,
    },
  });

  if (!layout) {
    // You can change "DEFAULT" to whatever template you’re using
    layout = await prisma.layout.create({
      data: {
        sessionId,
        templateId: "DEFAULT",
      },
      include: {
        items: true,
      },
    });
  }

  return layout;
}


// Creates an item and associates it with a layout with given id 
export async function createItem(
  experienceId: string,
  sessionId: string,
  position: number,
  patternId: string,
){
  // checks for exisiting layout 
  let layout = await prisma.layout.findUnique({
    where: {
      id: sessionId
    }
  })
  if(!layout) {

  }

  // get experience 
  let exp = await prisma.experience.findUnique({
    where: {
      id: experienceId
    }
  })

  if(!exp) {
    throw new Error("experience not found");
  }

  // shoudl i make a layoutItem then add it to the items array in layout?
  let updatedLayout = await prisma.layout.update({
    where: {
      id: sessionId
    },
    data: {
      items: {
        create: {
             experienceId,
             patternId,
             position
        }
      }
    },
    include: {
      items: true
    }
  });

  return updatedLayout;
}


export async function fetchLayoutBySessionId(sessionId: string) {
  let layout = await prisma.layout.findUnique({
    where: {
      sessionId
    }
  })
  return layout;
}

// get layout items by layoutId 

export async function fetchItems(layoutId: string ) {
  let items = await prisma.layout.findUnique({
   where: {
    id: layoutId
   },
   select: {
    items: true
   }
  })
  return items;
}
